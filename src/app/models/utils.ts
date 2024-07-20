import { environment } from '../../environments/environment';
import { CodeLanguages } from './code.model';

export interface CursoredRessource<T> {
	data: T[];
	cursor: string;
	limit: number;
	total: number;
}

export const fileUrl = environment.backendUrl + '/files/';

export enum InputHelper {
	javascript = `const fs = require('fs').promises;

fs.readFile('input.txt', 'utf8')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });
`,
	python = `
  try:
    with open('input.txt', 'r') as file:
        data = file.read()
        print(data)
except Exception as e:
    print('Error reading file:', e)
  `,
}

export enum OutputHelper {
	javascript = `fs.writeFile('output.txt', reversedContent)
    .then(() => {
        console.log('File written successfully');
    })
    .catch(err => {
        console.error('Error writing file:', err);
    });
`,
	python = `
  try:
    with open('output.txt', 'w') as file:
        file.write(output_data)
    print("Data written to output.txt successfully.")
except Exception as e:
    print('Error writing to file:', e)
  `,
}

export const copyHelper = async (
	language: string,
	need: 'read input' | 'write output'
) => {
	if (need === 'read input') {
		switch (language) {
			case CodeLanguages.javascript:
				await navigator.clipboard.writeText(InputHelper.javascript);
				break;
			case CodeLanguages.python:
				await navigator.clipboard.writeText(InputHelper.python);
				break;
		}
	} else {
		switch (language) {
			case CodeLanguages.javascript:
				await navigator.clipboard.writeText(OutputHelper.javascript);
				break;
			case CodeLanguages.python:
				await navigator.clipboard.writeText(OutputHelper.python);
				break;
		}
	}
};
