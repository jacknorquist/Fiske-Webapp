Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
Rails.application.routes.draw do
  resources :users, only: [:create, :index, :show, :update, :destroy] do
    collection do
      get 'profile', to: 'users#profile'
    end
    member do
      get 'groups', to: 'users#groups'
      get 'posts', to: 'users#posts'
      get 'feed', to: 'users#feed'
    end
  end
end

Rails.application.routes.draw do
  post '/login', to: 'authentication#login'
end

Rails.application.routes.draw do
  resources :groups, only: [:index, :show, :create, :update, :destroy] do
    post 'join', on: :member
    delete 'leave', on: :member
    resources :posts, only: [:create, :index_group, :show, :update, :destroy] do
      resources :comments, only: [:create, :index, :show, :destroy]
    end
  end
end


Rails.application.routes.draw do
  resources :posts, only: [:index]
end





