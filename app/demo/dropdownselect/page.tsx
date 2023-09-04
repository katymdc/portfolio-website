'use client'

import Image from 'next/image';
import DropdownSelect from '../../../components/DropdownSelect';

const DropdownDemo = () => {
    const options = [
        { value: 'red', label: 'Red' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
        { value: 'purple', label: 'Purple' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'white', label: 'White'},
    ];

    return (
        <main className="min-h-screen p-4">
            <h1 className="mb-4 text-lg">DropdownSelect Reusable React Component Demo</h1>
            <p className="mb-4"><a href="https://github.com/katymdc/portfolio-site" className="underline text-blue-600" href="">Git Source Code</a></p>
            <p className="mb-1">Technologies Used</p>
            <ul className="mb-8 ml-8 list-disc">
                <li>ReactJS</li>
                <li>NextJS *NEW*</li>
                <li>Tailwind CSS *NEW*</li>
                <li>TypeScript *NEW*</li>
                <li>AWS (S3, Route 53, CloudFront)</li>
            </ul>

            <DropdownSelect
                label="Select a color"
                options={options}
                onChange={(value: string) => console.log(value)}
                isSearchable
            />
        </main>
    );
}

export default DropdownDemo;