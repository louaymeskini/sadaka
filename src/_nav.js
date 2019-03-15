export default {
  items: [
    {
      name: 'Associations',
      url: '/home/association',
      icon: 'icon-badge',
      children: [
        {
          name: 'Liste Associations',
          url: '/home/association',
          icon: 'icon-badge',
        },
        {
          name: 'Ajouter Association',
          url: '/home/association/ajouter',
          icon: 'icon-badge',
        }
      ]
    },
    {
      name: 'Benevole',
      url: '/home/benevole',
      icon: 'icon-user',
      children: [
        {
          name: 'Liste Benevoles',
          url: '/home/benevole',
          icon: 'icon-user',
        }
        ]
    },
    {
      name: 'Administrateur',
      url: '/home/admin',
      icon: 'icon-settings',
      children: [
        {
          name: 'Modifier Admin',
          url: '/home/admin/modifier',
          icon: 'icon-settings',
        }
      ]
    }

  ],
};
