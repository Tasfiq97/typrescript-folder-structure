export const list = {
    name: "Root",
    isFolder: true,
    items: [
      {
        name: "folder 1",
        isFolder: true,
        items: [
          {
            name: "folder 1 1",
            isFolder: true,
            items: [
              {
                name: "folderData.js",
                isFolder: false,
                items: []
              }
            ]
          },
          {
            name: "folder 1 2",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        name: "folder 2",
        isFolder: true,
        items: [
          {
            name: "components",
            isFolder: true,
            items: [
              {
                name: "Folder.js",
                isFolder: false,
                items: []
              }
            ]
          },
          {
            name: "App.js",
            isFolder: false,
            items: []
          },
          {
            name: "index.js",
            isFolder: false,
            items: []
          },
          {
            name: "styles.css",
            isFolder: false,
            items: []
          }
        ]
      },
      {
        name: "folder 3",
        isFolder: false,
        items: []
      }
    ]
  };