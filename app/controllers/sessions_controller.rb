class SessionsController < ApplicationController
  def create
    user = User.find_by(email: sessions_params[:email])
    if user && user.authenticate(sessions_params[:password])
      jwt = JWT.encode(
        {
          user: user.id,
          exp: 24.hours.from_now.to_i
        },
        Rails.application.credentials.fetch(:secret_key_base),
        'HS256'
      )
      render json: {jwt: jwt, email: user.email, status: :created}
    else
      render json: {}
    end
  end

  private

  def sessions_params
    params.require(:session).permit(:email, :password)
  end
end
