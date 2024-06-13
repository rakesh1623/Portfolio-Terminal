document.addEventListener('DOMContentLoaded', function() {
    const cliContainer = document.getElementById('cli-container');

    function handleCommand(textarea) {
        const command = textarea.value.trim().toLowerCase();
        const output = document.createElement('div');
        output.className = 'output';
        output.style.fontSize = '20px';
        output.style.color = "#769174";
        output.style.marginTop = '10px';
        output.style.fontFamily = 'monospace';  

        if (command === 'help') {
            displayObject(output, help);
        } else if (command === 'whoami') {
            output.textContent = whoami;
        } else if (command === 'whoareu') {
            output.textContent = whoareu;
        } else if (command === 'projects') {
            displayObject(output, projects);
        } else if (command === 'contact') {
            displayObject(output, contacts);
        } else if (command === 'clear') {
            clearOutput(); 
        } else if (command === 'project-yoga') {
            displayProjects(output, yoga);
        } else if (command === 'project-attendance') {
            displayProjects(output, attendance);
        } else if(command === 'social'){
            displaySocialLinks(output, social);
        } else if (command === 'resume') {
            openResumeInNewTab();
        } else {
            output.textContent = 'Unknown command';
        }

        cliContainer.appendChild(output);
        createNewPrompt();
    }

    function clearOutput() {
        const outputs = document.querySelectorAll('.output');
        outputs.forEach(output => output.remove());

        const previousPrompts = document.querySelectorAll('.cli-line');
        previousPrompts.forEach(prompt => prompt.remove());
    }

    function openResumeInNewTab() {
        const resumeFileName = 'resume.pdf';
        const resumeUrl = `${resumeFileName}`;
    
        window.open(resumeUrl, '_blank');
    }
    

    function displayObject(parent, obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const outputField = document.createElement('div');
                const keyElement = document.createElement('span');
                const valueElement = document.createElement('span');

                keyElement.textContent = key;
                keyElement.style.color = '#f59e0b';
                keyElement.style.fontWeight = 'bold';
                

                valueElement.textContent = obj[key];
                valueElement.style.color = '#769174';

                outputField.appendChild(keyElement);
                outputField.appendChild(document.createTextNode(' - '));
                outputField.appendChild(valueElement);
                parent.appendChild(outputField);
            }
        }
    }

    function displayProjects(parent, obj, indent = 0) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const keyLabel = document.createElement('div');
                keyLabel.style.marginBottom = "6px";
                keyLabel.style.color = '#f59e0b';  
                keyLabel.style.fontWeight = 'bold';
                keyLabel.textContent = `${'|   '.repeat(indent)}|-- ${key}`;
                parent.appendChild(keyLabel);
    
                const valueObj = obj[key];
                if (typeof valueObj === 'object') {
                    displayProjects(parent, valueObj, indent + 1);
                } else {
                    const valueField = document.createElement('div');
                    valueField.style.color = '#769174';  
                    valueField.style.marginBottom = "3px";
                    valueField.textContent = `${'|   '.repeat(indent + 1)}|-- ${valueObj}`;
                    parent.appendChild(valueField);
                }
            }
        }
    }
    
    function displaySocialLinks(parent, obj) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const outputField = document.createElement('div');
                const keyElement = document.createElement('span');
                const link = document.createElement('a');

                outputField.style.display = "flex";

                keyElement.textContent = key;
                keyElement.style.color = '#f59e0b';
                keyElement.style.fontWeight = 'bold';
                keyElement.style.marginRight = "7px";

                link.href = obj[key];
                link.textContent = obj[key];
                link.style.display = 'block';
                link.style.color = '#769174';
                link.style.marginBottom = '5px';
                link.style.marginLeft = "7px";
                link.target = '_blank'; 

                outputField.appendChild(keyElement);
                outputField.appendChild(document.createTextNode(' - '));
                outputField.appendChild(link)
    
                parent.appendChild(outputField);
            }
        }
    }
    

    function createNewPrompt() {
        const cliLine = document.createElement('div');
        cliLine.className = 'cli-line';

        const prompt = document.createElement('p');
        prompt.className = 'root';
        prompt.style.fontWeight = 'bold';
        prompt.style.fontSize = '18px';
        prompt.style.color = 'indianred';
        prompt.textContent = 'visitor@rakesh.com:-$';
        cliLine.appendChild(prompt);

        const newTextarea = document.createElement('textarea');
        newTextarea.className = 'commandInput';
        newTextarea.rows = 1;
        newTextarea.cols = 30;
        newTextarea.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleCommand(newTextarea);
                newTextarea.setAttribute('readonly', true);
            }
        });

        cliLine.appendChild(newTextarea);
        cliContainer.appendChild(cliLine);
        newTextarea.focus();
    }

    const initialTextarea = document.querySelector('.commandInput');
    initialTextarea.focus();
    initialTextarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleCommand(initialTextarea);
            initialTextarea.setAttribute('readonly', true);
        }
    });
});