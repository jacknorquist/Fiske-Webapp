Rails.application.routes.draw do
  get 'home/index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
Rails.application.routes.draw do
  get 'home/index'
  resources :users, only: [:create, :index, :show, :update, :destroy] do
    collection do
      get 'profile', to: 'users#profile'
    end
    member do
      get 'groups', to: 'users#groups'
      get 'posts', to: 'users#posts'
      get 'feed', to: 'users#feed'
      get 'admin', to: 'users#admin_groups'
    end
  end
end

Rails.application.routes.draw do
  get 'home/index'
  post '/login', to: 'authentication#login'
end

Rails.application.routes.draw do
  get 'home/index'
  resources :groups, only: [:index, :show, :create, :update, :destroy] do
    post 'join', on: :member
    delete 'leave', on: :member
    collection do
      get 'search', to: 'groups#search'
    end
    resources :posts, only: [:create, :index, :update, :destroy] do
      collection do
        get '/', to: 'posts#index_group'
      end
      resources :comments, only: [:create, :show, :destroy]
    end
  end
end



Rails.application.routes.draw do
  get 'home/index'
  resources :posts, only: [:index, :show]
end


Rails.application.routes.draw do
  get 'home/index'
  resources :fishes, only:[:index, :create]
end

Rails.application.routes.draw do
  get 'home/index'
  resources :user_fishboards, only:[:show]
end


Rails.application.routes.draw do
  get 'home/index'
  resources :group_fishboards, only:[:show]
end

Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'
end





