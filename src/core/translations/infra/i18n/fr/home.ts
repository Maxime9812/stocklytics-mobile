import { HomeTranslation } from '../type';

const home: HomeTranslation = {
  navigation: {
    items: 'Inventaire',
    scan: 'Scan',
    menu: 'Menu',
  },
  itemDetails: {
    editName: 'Modifier le nom',
    images: {
      title: 'Améliorez la visibilité avec une superbe image',
      subTitle:
        'Téléchargez une image, avec une limite de 10 Mo. Formats pris en charge : JPG et PNG',
      choose: 'Choisir depuis la bibliothèque',
      delete: 'Supprimer l’image',
    },
    note: {
      name: 'Note',
      edit: 'Modifier la note',
      add: 'Ajouter une note',
    },
    quantity: {
      name: 'Quantité',
      edit: 'Ajuster',
    },
    delete: 'Supprimer',
    tags: {
      name: 'Labels',
      edit: 'Modifier les labels',
    },
    barcode: {
      name: 'Code-barres',
      link: 'Lier le code-barres',
      unlink: 'Dissocier',
      alreadyLinked: {
        title: 'Code-barres déjà lié',
        subTitle: 'Un objet avec ce code-barres est déjà lié',
      },
    },
    createdAt: 'Créé le',
  },
  items: {
    new: 'Nouveau',
    folders: 'Dossiers',
    items: 'Objets',
    totalQuantity: 'Quantité totale',
    addBottomSheet: {
      title: 'Ajouter',
      subTitle: 'Ajouter un nouvel objet ou un dossier à',
      item: 'Ajouter un objet',
      folder: 'Ajouter un dossier',
    },
    unit_one: '{{count}} unité',
    unit_zero: '{{count}} unité',
    unit_other: '{{count}} unités',
    emptyFolder: {
      title: 'Ce dossier est vide',
      subTitle: 'Ajouter un objet ou un dossier à ce dossier',
    },
  },
  delete: {
    folder: {
      title: 'Supprimer',
      subTitle1: 'Êtes-vous sûr de vouloir supprimer ',
      subTitle2: ' et tous les éléments de ce dossier ?',
      confirm: 'Supprimer',
    },
    item: {
      title: 'Supprimer',
      subTitle: 'Êtes-vous sûr de vouloir supprimer ',
      confirm: 'Supprimer',
    },
  },
  add: {
    folder: {
      title: 'Ajouter un dossier',
      subTitle: 'Ajouter un nouveau dossier à ',
      form: {
        name: {
          label: 'Nom',
          placeholder: 'Nom du dossier',
        },
        submit: 'Ajouter',
      },
    },
    item: {
      title: 'Ajouter un objet',
      subTitle: 'Ajouter un nouvel objet à ',
      form: {
        name: {
          label: 'Nom',
          placeholder: "Nom de l'objet",
        },
        quantity: 'Quantité',
        submit: 'Ajouter',
      },
    },
  },
  edit: {
    item: {
      quantity: {
        title: 'Quantité',
        subTitle: 'Ajusté la quantité de ',
        form: {
          quantity: {
            placeholder: 'Quantité',
          },
          submit: 'Ajuster',
        },
        newQuantity: 'Nouvelle quantité',
        currentQuantity: 'Quantité actuelle',
      },
      tags: {
        title: 'Labels',
        subTitle: 'Ajouter ou modifier les labels',
        form: {
          tags: {
            placeholder: 'Labels',
          },
          submit: 'Sauvegarder',
        },
      },
      note: {
        title: 'Note',
        subTitle: 'Ajouter ou modifier la note',
        form: {
          note: {
            placeholder: 'Note',
          },
          submit: 'Sauvegarder',
        },
      },
      name: {
        title: 'Nom',
        subTitle: "Modifier le nom de l'objet",
        form: {
          name: {
            placeholder: "Nom de l'objet",
          },
          submit: 'Sauvegarder',
        },
      },
    },
  },
  menu: {
    signOut: {
      button: 'Déconnexion',
      message:
        'Veuillez vous assurer que vos éléments et dossiers ont été synchronisés avant de vous déconnecter.',
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      confirm: 'Déconnexion',
      cancel: 'Annuler',
    },
  },
  scan: {
    notFound: {
      title: 'Aucun résultat',
      subTitle:
        'Vous pouvez lier un code-barres à un objet de votre inventaire',
    },
    item: {
      details: 'Détails',
      unit_zero: '{{count}} unité',
      unit_one: '{{count}} unité',
      unit_other: '{{count}} unités',
    },
  },
};

export default home;
