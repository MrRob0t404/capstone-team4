import React from "react";
import AceDiff from "ace-diff";
import "../CSS/AceEditor.css";

class AceEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            rightEditor: this.githubCode,
        }
        this.githubCode = `{import githubCode}`
    }



    componentDidMount() {
        const { rightEditor } = this.state

        // This object creates the split editor and imports it in the element with className ".acediff"
        var aceDiffer = new AceDiff({
            mode: null,
            theme: null,
            element: ".acediff",
            diffGranularity: 'broad',
            showDiffs: true,
            showConnectors: true,
            maxDiffs: 5000,
            left: {
                content: this.githubCode,
                mode: null,
                theme: null,
                editable: false,
                copyLinkEnabled: true
            },
            right: {
                content: this.githubCode,
                mode: null,
                theme: null,
                editable: true,
                copyLinkEnabled: true,

            },
            classes: {
                diff: 'acediff__diffLine',
                connector: 'acediff__connector',
                newCodeConnectorLinkContent: '&#8594;',
                deletedCodeConnectorLinkContent: '&#8592;',
            },

        });

        // This function tracks the changes made to the right side of the editor and updates the state
        aceDiffer.getEditors().right.on("change", () => {
            this.setState({
                rightEditor: aceDiffer.getEditors().right.getValue()
            })
        })

    }



    render() {
        const { rightEditor } = this.state
        return (
            <div className="acediff"></div>
        )
    }
}

export default AceEditor;

