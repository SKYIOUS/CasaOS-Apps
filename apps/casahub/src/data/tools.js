export const CATEGORIES = [
    { id: 'all', name: 'All Tools', icon: '🎡' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'dev', name: 'Developer', icon: '👨‍💻' },
    { id: 'network', name: 'Network', icon: '🌐' },
    { id: 'math', name: 'Math', icon: '➗' },
    { id: 'text', name: 'Text', icon: '📝' },
    { id: 'utility', name: 'Utility', icon: '🛠️' },
];

export const TOOLS = [
    // Existing Security
    {
        id: 'password-gen',
        title: 'Password Generator',
        category: 'security',
        icon: '🔑',
        description: 'Generate secure, random passwords instantly.',
    },
    {
        id: 'base64',
        title: 'Base64 Tool',
        category: 'security',
        icon: '🔏',
        description: 'Encode or decode Base64 strings.',
    },
    // New Security
    {
        id: 'hash-gen',
        title: 'Hash Generator',
        category: 'security',
        icon: '⚗️',
        description: 'Generate MD5, SHA1, SHA256 hashes.',
    },
    {
        id: 'jwt-decoder',
        title: 'JWT Decoder',
        category: 'security',
        icon: '🎫',
        description: 'Decode and inspect JSON Web Tokens.',
    },
    {
        id: 'qr-gen',
        title: 'QR Code Generator',
        category: 'security',
        icon: '🔳',
        description: 'Create QR codes from any text.',
    },

    // Existing Developer
    {
        id: 'json-format',
        title: 'JSON Formatter',
        category: 'dev',
        icon: '{}',
        description: 'Prettify and validate your JSON data.',
    },
    // New Developer
    {
        id: 'regex-tester',
        title: 'Regex Tester',
        category: 'dev',
        icon: '🧪',
        description: 'Test and debug regular expressions.',
    },
    {
        id: 'uuid-gen',
        title: 'UUID Generator',
        category: 'dev',
        icon: '🆔',
        description: 'Generate versions 1 and 4 UUIDs.',
    },
    {
        id: 'color-picker',
        title: 'Color Picker',
        category: 'dev',
        icon: '🎨',
        description: 'Interactive color selection and hex codes.',
    },
    {
        id: 'html-encoder',
        title: 'HTML Entity Tool',
        category: 'dev',
        icon: '📑',
        description: 'Encode or decode HTML entities.',
    },

    // Existing Network
    {
        id: 'network-info',
        title: 'Network Info',
        category: 'network',
        icon: '🌐',
        description: 'Check your public IP and connection status.',
    },
    // New Network
    {
        id: 'url-parser',
        title: 'URL Parser',
        category: 'network',
        icon: '🔗',
        description: 'Break down URLs into their components.',
    },
    {
        id: 'dns-lookup',
        title: 'DNS Lookup',
        category: 'network',
        icon: '🔎',
        description: 'Fetch DNS records for a domain.',
    },

    // Existing Math
    {
        id: 'unit-converter',
        title: 'Unit Converter',
        category: 'math',
        icon: '⚖️',
        description: 'Quick conversions for common units.',
    },
    // New Math
    {
        id: 'sci-calculator',
        title: 'Scientific Calculator',
        category: 'math',
        icon: '🧮',
        description: 'Advanced calculations and functions.',
    },
    {
        id: 'percent-calc',
        title: 'Percentage Calculator',
        category: 'math',
        icon: '📈',
        description: 'Calculate percentages easily.',
    },
    {
        id: 'aspect-ratio',
        title: 'Aspect Ratio Calc',
        category: 'math',
        icon: '📺',
        description: 'Calculate dimensions and ratios.',
    },

    // New Text
    {
        id: 'word-counter',
        title: 'Word Counter',
        category: 'text',
        icon: '🔢',
        description: 'Count words, chars, and lines.',
    },
    {
        id: 'lorem-ipsum',
        title: 'Lorem Ipsum',
        category: 'text',
        icon: '📄',
        description: 'Generate placeholder text.',
    },
    {
        id: 'case-converter',
        title: 'Case Converter',
        category: 'text',
        icon: '🔠',
        description: 'Convert text between different cases.',
    },
    {
        id: 'diff-viewer',
        title: 'Diff Viewer',
        category: 'text',
        icon: '📉',
        description: 'Compare two text snippets.',
    },
    {
        id: 'md-preview',
        title: 'Markdown Preview',
        category: 'text',
        icon: 'Ⓜ️',
        description: 'Live preview for Markdown text.',
    },

    // Existing Utility
    {
        id: 'scratchpad',
        title: 'Scratchpad',
        category: 'utility',
        icon: '📝',
        description: 'A simple place to keep temporary notes.',
    },
    // New Utility
    {
        id: 'stopwatch',
        title: 'Stopwatch',
        category: 'utility',
        icon: '⏱️',
        description: 'High precision timing tool.',
    },
    {
        id: 'countdown',
        title: 'Countdown',
        category: 'utility',
        icon: '⏳',
        description: 'Set timers for your tasks.',
    },
    {
        id: 'pomodoro',
        title: 'Pomodoro',
        category: 'utility',
        icon: '🍅',
        description: 'Focus timer for productivity.',
    },
];
