# Digital Notice Board Chrome Extension

Welcome to the Digital Notice Board Chrome Extension! This project is part of the HyperVerge Open Challenge Round 2024, aimed at enhancing communication and collaboration within an organization through a customizable digital notice board.

## Features

### Mandatory Widgets
- **Google Slides Integration:** Embed Google Slides directly into the homepage.
- **Pomodoro Timer:** A productivity timer to manage work sessions.

### Optional Widgets
- **Google Sheets, Forms, and Meet:** Custom embedded links for seamless integration.
- **Spotify Music Widget:** Embed Spotify music (requires login and a premium account for full playback).
- **Other Widgets:** Polls, Issue Tracker, Daily Growth Checklist, Announcements, Health Tracker, Opportunity Board, Leaderboard, Today I Learned Corner, Google Calendar, Google Keep, ChatGPT, Notion Page.

## Edge Cases and Special Needs Addressed
- **Private API Constraints:** Widgets like Chatbox and Notion were not implemented due to private API restrictions.
- **Authentication Requirements:** The Spotify widget requires user login, and full song playback needs a premium account.
- **Custom Embedding:** Implemented custom links for Google Sheets, Forms, and Meet to ensure accessibility and usability.

## Additional Features
- **Framer Motion:** Implemented Framer Motion on the widgets for smooth animations and enhanced user experience.

## Getting Started

### Prerequisites
- Chrome browser
- Node.js and npm installed

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ayussh203/Chrome-Exten.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Chrome-Exten
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Build the project:
    ```bash
    npm run build
    ```

### Running the Extension
1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable 'Developer mode'.
3. Click 'Load unpacked' and select the `build` folder from the project directory.

## Usage
- Customize your digital notice board with various widgets.
- Enhance productivity and communication within your organization.

![Widgets_1](https://github.com/user-attachments/assets/1e320b96-474e-4a1a-bf02-b40a8464a980)
![Widgets_2](https://github.com/user-attachments/assets/20d33256-ebee-42ef-914b-b65e3fc760ef)

## Contribution
We welcome contributions! Please fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.
