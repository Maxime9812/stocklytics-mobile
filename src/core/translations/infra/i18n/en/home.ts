export default {
  navigation: {
    items: 'Inventory',
    scan: 'Scan',
    menu: 'Menu',
  },
  itemDetails: {
    editName: 'Edit name',
    images: {
      title: 'Enhance visibility with great image',
      subTitle:
        'Upload a image, with a limit of 10 MB. Supported formats JPG and PNG',
      choose: 'Choose image from library',
      delete: 'Delete image',
    },
    note: {
      name: 'Note',
      edit: 'Edit note',
      add: 'Add note',
    },
    quantity: {
      name: 'Quantity',
      edit: 'Adjust',
    },
    delete: 'Supprimer',
    tags: {
      name: 'tags',
      edit: 'Edit tags',
    },
    barcode: {
      name: 'Barcode',
      link: 'Link barcode',
      unlink: 'Unlink',
      alreadyLinked: {
        title: 'Barcode already linked',
        subTitle: 'An item with this barcode is already linked',
      },
    },
    createdAt: 'Created at',
  },
  items: {
    new: 'New',
    folders: 'Folders',
    items: 'Items',
    totalQuantity: 'Total quantity',
    addBottomSheet: {
      title: 'Add',
      subTitle: 'Add new item or folder to',
      item: 'Add item',
      folder: 'Add folder',
    },
    unit_one: '{{count}} unit',
    unit_zero: '{{count}} unit',
    unit_other: '{{count}} units',
    emptyFolder: {
      title: 'This folder is empty',
      subTitle: 'Add item or folder to this folder',
    },
  },
  delete: {
    folder: {
      title: 'Delete',
      subTitle1: 'Are you sure you want to delete ',
      subTitle2: ' and all elements in this folder ?',
      confirm: 'Delete',
    },
    item: {
      title: 'Delete',
      subTitle: 'Are you sure you want to delete ',
      confirm: 'Delete',
    },
  },
  add: {
    folder: {
      title: 'Add folder',
      subTitle: 'Add new folder to ',
      form: {
        name: {
          label: 'Name',
          placeholder: 'Folder name',
        },
        submit: 'Add',
      },
    },
    item: {
      title: 'Add item',
      subTitle: 'Add new item to ',
      form: {
        name: {
          label: 'Name',
          placeholder: 'Item name',
        },
        quantity: 'Quantity',
        submit: 'Add',
      },
    },
  },
  edit: {
    item: {
      quantity: {
        title: 'Quantity',
        subTitle: 'Adjust quantity of ',
        form: {
          quantity: {
            placeholder: 'Quantity',
          },
          submit: 'Adjust',
        },
        newQuantity: 'New quantity',
        currentQuantity: 'Current quantity',
      },
      tags: {
        title: 'Tags',
        subTitle: 'Edit item tags',
        form: {
          submit: 'Save',
        },
      },
      note: {
        title: 'Note',
        subTitle: "Edit item's note",
        form: {
          note: {
            placeholder: 'Note',
          },
          submit: 'Save',
        },
      },
      name: {
        title: 'Name',
        subTitle: "Edit item's name",
        form: {
          name: {
            placeholder: 'Item name',
          },
          submit: 'Save',
        },
      },
    },
  },
  menu: {
    signOut: {
      button: 'Sign out',
      message:
        'Please ensure your items & folders have been synced before signing out.',
      title: 'Are you sure you want to sign out ?',
      confirm: 'Sign out',
      cancel: 'Cancel',
    },
  },
  scan: {
    notFound: {
      title: 'No barcode found',
      subTitle: 'You can link a barcode to an item from your inventory',
    },
    item: {
      details: 'Details',
      unit_zero: '{{count}} unit',
      unit_one: '{{count}} unit',
      unit_other: '{{count}} units',
    },
  },
  move: {
    item: {
      title: 'Move item',
      subTitle: {
        start: 'Move ',
        end: ' to another folder',
      },
      submit: 'Move',
    },
  },
};
