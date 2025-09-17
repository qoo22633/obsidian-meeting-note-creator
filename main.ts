import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, moment } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MeetingNoteSettings {
	mySetting: string;
	meetingTemplateFolder: string;
	defaultTemplate: string;
}

const DEFAULT_SETTINGS: MeetingNoteSettings = {
	mySetting: 'default',
	meetingTemplateFolder: 'Templates/Meetings',
	defaultTemplate: 'default-meeting'
}

export default class MeetingNoteCreatorPlugin extends Plugin {
	settings: MeetingNoteSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('calendar-plus', 'Create Meeting Note', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new MeetingNoteModal(this.app, this).open();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Meeting Note Creator');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'create-meeting-note',
			name: 'Create Meeting Note',
			callback: () => {
				new MeetingNoteModal(this.app, this).open();
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'insert-meeting-template',
			name: 'Insert Meeting Template',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertMeetingTemplate(editor);
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MeetingNoteSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async createMeetingNote(title: string, participants: string[], agenda: string[]) {
		const now = moment();
		const dateString = now.format('YYYY-MM-DD');
		const timeString = now.format('HH:mm');
		
		const fileName = `${dateString} - ${title}.md`;
		const folderPath = this.settings.meetingTemplateFolder;
		
		// Create folder if it doesn't exist
		if (!await this.app.vault.adapter.exists(folderPath)) {
			await this.app.vault.createFolder(folderPath);
		}
		
		const filePath = `${folderPath}/${fileName}`;
		
		const content = this.generateMeetingNoteContent(title, dateString, timeString, participants, agenda);
		
		try {
			const file = await this.app.vault.create(filePath, content);
			await this.app.workspace.getLeaf().openFile(file);
			new Notice(`Meeting note created: ${fileName}`);
		} catch (error) {
			new Notice('Error creating meeting note: ' + error.message);
		}
	}

	generateMeetingNoteContent(title: string, date: string, time: string, participants: string[], agenda: string[]): string {
		let content = `# ${title}\n\n`;
		content += `**Date:** ${date}\n`;
		content += `**Time:** ${time}\n`;
		content += `**Participants:**\n`;
		
		participants.forEach(participant => {
			content += `- ${participant}\n`;
		});
		
		content += `\n## Agenda\n`;
		agenda.forEach((item, index) => {
			content += `${index + 1}. ${item}\n`;
		});
		
		content += `\n## Notes\n\n`;
		content += `## Action Items\n\n`;
		content += `- [ ] \n\n`;
		content += `## Next Steps\n\n`;
		
		return content;
	}

	insertMeetingTemplate(editor: Editor) {
		const template = `## Meeting Notes

**Date:** ${moment().format('YYYY-MM-DD')}
**Time:** ${moment().format('HH:mm')}
**Participants:**
- 

## Agenda
1. 

## Notes


## Action Items
- [ ] 

## Next Steps

`;
		editor.replaceSelection(template);
	}
}

class MeetingNoteModal extends Modal {
	plugin: MeetingNoteCreatorPlugin;
	title: string = '';
	participants: string[] = [''];
	agenda: string[] = [''];

	constructor(app: App, plugin: MeetingNoteCreatorPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl('h2', {text: 'Create Meeting Note'});

		// Title input
		new Setting(contentEl)
			.setName('Meeting Title')
			.setDesc('Enter the title of the meeting')
			.addText(text => text
				.setPlaceholder('Weekly Team Standup')
				.setValue(this.title)
				.onChange(async (value) => {
					this.title = value;
				}));

		// Participants section
		const participantsDiv = contentEl.createDiv();
		participantsDiv.createEl('h3', {text: 'Participants'});
		
		const addParticipantBtn = participantsDiv.createEl('button', {text: 'Add Participant'});
		addParticipantBtn.onclick = () => {
			this.participants.push('');
			this.refreshParticipants(participantsDiv);
		};

		this.refreshParticipants(participantsDiv);

		// Agenda section
		const agendaDiv = contentEl.createDiv();
		agendaDiv.createEl('h3', {text: 'Agenda'});
		
		const addAgendaBtn = agendaDiv.createEl('button', {text: 'Add Agenda Item'});
		addAgendaBtn.onclick = () => {
			this.agenda.push('');
			this.refreshAgenda(agendaDiv);
		};

		this.refreshAgenda(agendaDiv);

		// Create button
		new Setting(contentEl)
			.addButton(btn => btn
				.setButtonText('Create Meeting Note')
				.setCta()
				.onClick(async () => {
					if (this.title) {
						await this.plugin.createMeetingNote(
							this.title, 
							this.participants.filter(p => p.trim() !== ''),
							this.agenda.filter(a => a.trim() !== '')
						);
						this.close();
					} else {
						new Notice('Please enter a meeting title');
					}
				}));
	}

	refreshParticipants(container: HTMLElement) {
		const existingInputs = container.querySelectorAll('.participant-input');
		existingInputs.forEach(input => input.remove());

		this.participants.forEach((participant, index) => {
			const inputDiv = container.createDiv({cls: 'participant-input'});
			const input = inputDiv.createEl('input', {
				type: 'text',
				placeholder: 'Participant name',
				value: participant
			});
			input.oninput = () => {
				this.participants[index] = input.value;
			};
			
			const removeBtn = inputDiv.createEl('button', {text: 'Remove'});
			removeBtn.onclick = () => {
				this.participants.splice(index, 1);
				this.refreshParticipants(container);
			};
		});
	}

	refreshAgenda(container: HTMLElement) {
		const existingInputs = container.querySelectorAll('.agenda-input');
		existingInputs.forEach(input => input.remove());

		this.agenda.forEach((item, index) => {
			const inputDiv = container.createDiv({cls: 'agenda-input'});
			const input = inputDiv.createEl('input', {
				type: 'text',
				placeholder: 'Agenda item',
				value: item
			});
			input.oninput = () => {
				this.agenda[index] = input.value;
			};
			
			const removeBtn = inputDiv.createEl('button', {text: 'Remove'});
			removeBtn.onclick = () => {
				this.agenda.splice(index, 1);
				this.refreshAgenda(container);
			};
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class MeetingNoteSettingTab extends PluginSettingTab {
	plugin: MeetingNoteCreatorPlugin;

	constructor(app: App, plugin: MeetingNoteCreatorPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Meeting Template Folder')
			.setDesc('Folder where meeting notes will be created')
			.addText(text => text
				.setPlaceholder('Templates/Meetings')
				.setValue(this.plugin.settings.meetingTemplateFolder)
				.onChange(async (value) => {
					this.plugin.settings.meetingTemplateFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}
