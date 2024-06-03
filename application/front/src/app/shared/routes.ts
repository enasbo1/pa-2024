export const  WpPath={
  home: 'home',
  login:'login',
  logout:'logout',
  admin:{
    home:'admin/home',
    tickets:{
      detail    : 'admin/tickets/:id',
      list      : 'admin/tickets/list',
      dashboard : 'admin/tickets/dashboard',
      root      : 'admin/tickets'
    },
    users :{
      new       : 'admin/users/new',
      sanction  : 'admin/users/:id/sanction',
      edit      : 'admin/users/:id/edit',
      detail    : 'admin/users/:id',
      root      : 'admin/users'
    },
    location:{
      detail    : 'admin/location/:id',
      root      :'admin/location'
    },
    services : {
      detail_presta:'admin/service_rendu/:id',
      presta    : 'admin/service_rendu',
      detail    : 'admin/services/:id',
      root      : 'admin/services',
    },
    chatbot   : 'admin/chatbot',

    enterprise : {
      root    : 'admin/enterprise',
    },

    root      : 'admin',
    root2     : 'admin/',
  },

  voyageur:{
    home      : 'voyageurs/home',
    myservices: 'voyageurs/myservices',
    root      :'voyageurs'
  }

}

