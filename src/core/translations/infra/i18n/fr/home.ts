import { HomeTranslation } from '../type';

const home: HomeTranslation = {
  navigation: {
    items: 'Inventaire',
    scan: 'Scan',
    menu: 'Menu',
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
};

export default home;
