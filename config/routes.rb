Rails.application.routes.draw do
  # api routes
  namespace :api do
    namespace :v1 do
      resources :posts, except: [:new, :edit]
    end
  end

  # user routes
  get '/dashboard/' => 'users#show'
  resources :users, only: [:edit, :update]

  # sessions routes
  get '/login' => 'sessions#new'
  post '/sessions' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
end
