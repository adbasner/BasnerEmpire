class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :require_current_user, only: [:create, :update, :destroy]

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

  def require_current_user
    if !current_user
      render json: {}
    end
  end
end
