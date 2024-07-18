import { environment } from '../../environments/environment';

export interface CursoredRessource<T> {
	data: T[];
	cursor: string;
	limit: number;
	total: number;
}

export const fileUrl = environment.backendUrl + '/files/';

export enum InputHelper {
	javascript = `
import { readFile } from 'fs';

readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
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
	javascript = `
      fs.writeFile('output.txt', reversedContent, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
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
