//1) open this nebpage and build your editor https://ckeditor.com/ckeditor-5/online-builder/
//2) download build zip and unzip your project to the root folder
//3) npm add file:build_folder_name
//4) npm install @ckeditor/ckeditor5-react

//Example
import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import CKEditorCustom from 'ckeditor5-custom-build/build/ckeditor';

const customEditor = () => {

  return (
    <CKEditor
      editor={CKEditorCustom}
      data={materialDesc}
      config={{
        placeholder: "placeholder",
        toolbar: {
          items: [
            'heading',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'fontColor',
            'fontBackgroundColor',
            'numberedList',
            'bulletedList',
            'outdent',
            'indent',
            'link',
            'imageUpload',
            'exportWord',
            'exportPdf'
          ]
        },
        exportWord: {
          fileName: `${materialTitle || 'document'}.docx`,
          converterOptions: {
            format: 'A4',
            margin_top: '20mm',
            margin_bottom: '20mm',
            margin_right: '12mm',
            margin_left: '12mm'
          },
        },
        exportPdf: {
          fileName: `${materialTitle || 'document'}.pdf`,
          converterOptions: {
            format: 'Letter',
            margin_top: '10mm',
            margin_bottom: '10mm',
            margin_right: '10mm',
            margin_left: '10mm',
            page_orientation: 'portrait'
          }
        }
      }}
      onReady={editor => _onReady(editor)}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log(data)
      }}
      onFocus={() => ()}
      onBlur={() => ()}
    />
  )
}

