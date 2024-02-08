import { Dropdown, Option } from '@fluentui/react-components';
import React, { useState, useEffect } from 'react';

interface JsonFile {
  name: string;
  content: Record<string, any>;
}

interface FileDropdownProps {
  onSelectFile: (content: Record<string, any> | null) => void;
}

const FileDropdown = ({ onSelectFile }: FileDropdownProps) => {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [jsonFiles, setJsonFiles] = useState<JsonFile[]>([]);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  useEffect(() => {
    const fetchFileNames = async () => {
      try {
        const response = await fetch('/api/getJsonFiles');
        const data = await response.json();
        const fetchedJsonFiles: JsonFile[] = data.jsonFiles || [];

        setJsonFiles(fetchedJsonFiles);
        setFileNames(fetchedJsonFiles.map((file) => file.name.replace(/\.json$/, ''))); 
      } catch (error) {
        console.error('Error fetching file names:', error);
      }
    };

    fetchFileNames();
  }, []);

  const handleFileSelect = (fileName: string) => {
    const selectedFile = jsonFiles.find((file) => file.name === fileName + '.json');
    setSelectedFileName(fileName);
    onSelectFile(selectedFile ? selectedFile.content : null);
  };

  return (
    <div>
      {/* <Dropdown
        defaultValue={selectedFileName}
        size='large'
        placeholder='Wisselen van tenant'
        className="m-3"
        onOptionSelect={(event, option) => {
          if (option && option.optionText) {
            handleFileSelect(option.optionText);
          }
        }}
      >
        {fileNames.map((fileName) => (
          <Option key={fileName} text={fileName} value={fileName}>
            {fileName}
          </Option>
        ))}
      </Dropdown> */}
    </div>
  );
};

export default FileDropdown;