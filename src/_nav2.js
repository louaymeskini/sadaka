export default {
  items: [
    {
      name: 'Benevoles Membres',
      url: '/home/benevole',
      icon: 'icon-user',
      children: [
        {
          name: 'Liste Benevoles',
          url: '/home/benevole/membre',
          icon: 'icon-user',
        }
        ]
    },
    {
      name: 'Evenements',
      url: '/home/evenement',
      icon: 'icon-calendar',
      children: [
        {
          name: 'Liste Evenements',
          url: '/home/evenement',
          icon: 'icon-calendar',
        },
        {
          name: 'Ajouter Evenements',
          url: '/home/evenement/ajouter',
          icon: 'icon-calendar',
        }
      ]
    },
    {
      name: 'Annonces',
      url: '/home/annonce',
      icon: 'icon-note',
      children: [
        {
          name: 'Liste Annonces',
          url: '/home/annonce',
          icon: 'icon-note',
        },
        {
          name: 'Ajouter Annonce',
          url: '/home/annonce/ajouter',
          icon: 'icon-note',
        }
      ]
    },
    {
      name: 'Association',
      url: '/home/association/profile',
      icon: 'icon-settings',
      children: [
        {
          name: 'Modifier Association',
          url: '/home/association/profile',
          icon: 'icon-settings',
        }
      ]
    }
  ],
};
