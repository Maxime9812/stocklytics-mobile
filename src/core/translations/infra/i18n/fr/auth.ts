import { Translation } from '../type';

const auth: Translation = {
  welcome: {
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    signIn: 'Se connecter',
    getStarted: 'Commencer',
    title: 'Bienvenue sur stocklytics',
  },
  register: {
    title: 'Créer un compte',
    subTitle: 'Commencez gratuitement dès aujourd’hui',
    form: {
      fullName: 'Nom complet',
      email: 'Email',
      password: 'Mot de passe',
    },
    termsAndConditions:
      'En utilisant l’application, vous acceptez les conditions générales et la politique de confidentialité de stocklytics',
    createAccount: 'Créer un compte',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    signIn: 'Se connecter',
  },
  login: {
    title: 'Bienvenue !',
    subTitle: 'Connectez-vous a votre compte',
    forgotPassword: 'J’ai oublié mon mot de passe',
    termsAndConditions:
      'En utilisant l’application, vous acceptez les conditions générales et la politique de confidentialité de stocklytics',
    continue: 'Continuer',
    newHere: 'Nouveau ici ?',
    createAccount: 'Créer un compte',
    form: {
      email: 'Email',
      password: 'Mot de passe',
    },
  },
  resetPassword: {
    title: 'Réinitialiser votre mot de passe',
    subTitle: 'Entrez votre email pour recevoir un lien de réinitialisation',
    form: {
      email: 'Email',
    },
    sendLink: 'Envoyer le lien',
  },
};

export default auth;
