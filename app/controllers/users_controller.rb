class UsersController < ApplicationController
  before_action :set_user
  before_action :require_same_user

  def show
    render 'show.json.jbuilder'
  end

  def update
    if @user.update(user_params)
      render 'show.json.jbuilder'
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def set_user
    @user = User.find_by(id: current_user.id)
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def require_same_user
    if current_user != @user
      render json: { errors: ['You must be logged in to do that.'] }, status: :unauthorized
    end
  end
end
