import React from 'react';
import * as Basic from './tools/BasicTools';
import * as Misc from './tools/MiscTools';
import * as NetMath from './tools/NetworkMathTools';
import * as Adv from './tools/AdvancedTools';
import * as Final from './tools/FinalTools';
import * as Text from './tools/TextTools';
import * as MathAdv from './tools/AdvancedMath';

const ToolRenderer = ({ toolId }) => {
    switch (toolId) {
        // Security
        case 'password-gen': return <Basic.PasswordGenerator />;
        case 'base64': return <Misc.Base64Tool />;
        case 'hash-gen': return <Basic.HashGenerator />;
        case 'jwt-decoder': return <Adv.AdvancedTools toolId={toolId} />;
        case 'qr-gen': return <Final.QrGenerator />;

        // Dev
        case 'json-format': return <Basic.JsonFormatter />;
        case 'regex-tester': return <Misc.RegexTester />;
        case 'uuid-gen': return <Misc.UUIDGenerator />;
        case 'color-picker': return <Misc.ColorPicker />;
        case 'html-encoder': return <Final.FinalTools />;

        // Network
        case 'network-info': return <NetMath.NetworkTools />;
        case 'url-parser': return <Adv.AdvancedTools toolId={toolId} />;

        // Math
        case 'unit-converter': return <NetMath.UnitConverter />;
        case 'sci-calculator': return <MathAdv.ScientificCalculator />;
        case 'percent-calc': return <NetMath.MathTools />;
        case 'aspect-ratio': return <NetMath.MathTools />;

        // Text
        case 'word-counter': return <Basic.WordCounter />;
        case 'lorem-ipsum': return <Basic.LoremIpsum />;
        case 'case-converter': return <Text.CaseConverter />;
        case 'diff-viewer': return <Text.DiffViewer />;
        case 'md-preview': return <Text.MarkdownPreview />;

        // Utility
        case 'scratchpad': return <Adv.Scratchpad />;
        case 'stopwatch': return <Misc.Stopwatch />;
        case 'countdown': return <NetMath.CountdownTimer />;
        case 'pomodoro': return <Adv.Pomodoro />;

        default:
            return <div>Tool component not found: {toolId}</div>;
    }
};

export default ToolRenderer;
