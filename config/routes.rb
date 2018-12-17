Rails.application.routes.draw do
  # api routes
  namespace :api do
    namespace :v1 do
      resources :posts, except: [:new, :edit]
      resources :messages, except: [:new, :edit, :update]
      get '/lastpost/' => 'posts#last'
    end
  end

  # user routes
  resources :users, only: [:show, :edit, :update]


  # sessions routes
  get '/login' => 'sessions#new'
  post '/sessions' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
end
