class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :require_same_user, only: [:edit, :update, :delete, :destroy]

  def index
    @posts = Post.all.order(created_at: :desc)
    render 'index.json.jbuilder'
  end

  def show
    render 'show.json.jbuilder'
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = 1
    if @post.save
      render 'show.json.jbuilder'
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def update
    if @post.update(post_params)
      render 'show.json.jbuilder'
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    if @post.destroy
      render json: { message: 'You deleted  that post.' }
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  # Drys up code
  def set_post
    @post = Post.find_by(id: params[:id])
  end

  # only allows certain params through
  def post_params
    params.require(:post).permit(:title, :content)
  end
  # Makes sure current_user is same as post created
  # Shouldn't be needed with only 1 user, but whatever
  # def require_same_user
  #   if admin_user != @post.user
  #     flash[:danger] = ['You can not edit these articles fool']
  #     redirect_to admin_posts_path
  #   end
  # end
end
