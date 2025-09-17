# Meeting Note Creator

An Obsidian plugin to create structured meeting notes with templates and automatic formatting.

## Features

- 📝 Create structured meeting notes with a simple modal interface
- 👥 Add participants to your meetings
- 📋 Create agenda items
- ⚡ Quick template insertion for existing notes
- 🎯 Automatic action items and next steps sections
- 📁 Configurable folder for meeting notes

## Installation

### Using BRAT (Beta Reviewer's Auto-update Tool)

1. Install the BRAT plugin from the Obsidian community plugins
2. Open the BRAT plugin settings
3. Add this repository URL: `https://github.com/yourusername/obsidian-meeting-note-creator`
4. The plugin will be automatically downloaded and can be enabled in your plugin settings

### Manual Installation

1. Download the latest release from the GitHub releases page
2. Extract the files to your vault's `.obsidian/plugins/obsidian-meeting-note-creator/` folder
3. Reload Obsidian
4. Enable the plugin in Settings > Community plugins

## Usage

### Creating a Meeting Note

1. Click the calendar icon in the left ribbon, or
2. Use the command palette (Ctrl/Cmd + P) and search for "Create Meeting Note", or
3. Use the hotkey (if configured)

This will open a modal where you can:
- Enter the meeting title
- Add participants
- Create agenda items

The plugin will create a structured note with:
- Meeting metadata (date, time, participants)
- Agenda items
- Notes section
- Action items checklist
- Next steps section

### Inserting a Template

You can also insert a meeting template into any existing note using:
- Command palette: "Insert Meeting Template"
- Or configure a hotkey for quick access

## Settings

- **Meeting Template Folder**: Choose where your meeting notes will be created (default: "Templates/Meetings")

## Template Structure

The generated meeting notes follow this structure:

```markdown
# Meeting Title

**Date:** YYYY-MM-DD
**Time:** HH:mm
**Participants:**
- Participant 1
- Participant 2

## Agenda
1. Agenda item 1
2. Agenda item 2

## Notes

## Action Items
- [ ] Action item

## Next Steps
```

## Development

### Setting up the development environment

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Make changes to `main.ts`
5. The plugin will automatically rebuild

### Building for release

1. Run `npm run build` to create a production build
2. The built files will be in the root directory

## Support

If you find this plugin helpful, consider supporting its development:
- ⭐ Star this repository
- 🐛 Report bugs or request features in the Issues section
- ☕ [Buy me a coffee](https://buymeacoffee.com/yourusername)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
