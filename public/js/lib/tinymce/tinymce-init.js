tinymce.init({
    selector: "#tinymce",
    theme: "modern",
    
    height: 400,
    
    plugins: "autolink anchor link preview code lists table hr",
    
    toolbar: [
        'undo redo | formatselect | bold italic underline strikethrough superscript subscript',
        'bullist numlist | hr | link | table  | preview code'
    ],
    menubar: false,
    statusbar: false
});