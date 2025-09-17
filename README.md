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
3. Click "Add Beta Plugin" and add this repository URL: `https://github.com/qoo22633/obsidian-meeting-note-creator`
4. The plugin will be automatically downloaded and can be enabled in your plugin settings

### BRATを使用したインストール（日本語）

1. ObsidianのコミュニティプラグインからBRATプラグインをインストール
2. BRATプラグインの設定を開く
3. "Add Beta Plugin"をクリックし、このリポジトリURL を追加: `https://github.com/qoo22633/obsidian-meeting-note-creator`
4. プラグインが自動的にダウンロードされ、プラグイン設定で有効化できます

### Manual Installation

1. Download the latest release from the GitHub releases page
2. Extract the files to your vault's `.obsidian/plugins/obsidian-meeting-note-creator/` folder
3. Reload Obsidian
4. Enable the plugin in Settings > Community plugins

## Usage / 使用方法

### Creating a Meeting Note / 会議ノートの作成

1. Click the calendar icon in the left ribbon, or / 左のリボンのカレンダーアイコンをクリック、または
2. Use the command palette (Ctrl/Cmd + P) and search for "Create Meeting Note", or / コマンドパレット（Ctrl/Cmd + P）で「Create Meeting Note」を検索、または
3. Use the hotkey (if configured) / ホットキーを使用（設定済みの場合）

This will open a modal where you can: / モーダルが開き、以下を設定できます：
- Enter the meeting title / 会議タイトルの入力
- Add participants / 参加者の追加
- Create agenda items / 議題項目の作成

The plugin will create a structured note with: / プラグインは以下の構造化されたノートを作成します：
- Meeting metadata (date, time, participants) / 会議メタデータ（日付、時間、参加者）
- Agenda items / 議題項目
- Notes section / ノートセクション
- Action items checklist / アクションアイテムのチェックリスト
- Next steps section / 次のステップセクション

### Inserting a Template / テンプレートの挿入

You can also insert a meeting template into any existing note using: / 既存のノートに会議テンプレートを挿入することもできます：
- Command palette: "Insert Meeting Template" / コマンドパレット：「Insert Meeting Template」
- Or configure a hotkey for quick access / または素早くアクセスするためのホットキーを設定

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
- ☕ [Buy me a coffee](https://buymeacoffee.com/yudaiyamashita)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
