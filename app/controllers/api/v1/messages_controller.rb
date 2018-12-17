class Api::V1::MessagesController < ApplicationController
  def index
    @messages = Message.all.order(created_at: :desc)
    puts @messages
    if @messages.length > 1
      render 'index.json.jbuilder'
    else
      error_name = 'There have been no post made yet'
      error_email = 'Expect some soon!'
      error_message = 'You have friends I swear...'
      render json: { messages: [{ name: error_name, email: error_email, message: error_message }] }
    end
  end

  def show
  end

  def create
  end

  def delete
  end

  #   def index
  #   @posts = Post.all.order(created_at: :desc)
  #   if @posts.length > 1
  #     render 'index.json.jbuilder'
  #   else
  #     error_title = 'There have been no post made yet'
  #     error_message = 'Expect some soon!'
  #     render json: { posts: [{ title: error_title, content: error_message }] }
  #   end
  # end

  # def show
  #   if @post
  #     render 'show.json.jbuilder'
  #   else
  #     error_title = "This post doesn't seem to exist yet."
  #     error_message = 'Expect it soon!'
  #     render json: { title: error_title, content: error_message }
  #   end
  # end

  # def last
  #   @post = Post.last
  #   if @post
  #     render 'show.json.jbuilder'
  #   else
  #     error_title = 'There have been no post made yet'
  #     error_message = 'Expect some soon!'
  #     render json: { title: error_title, content: error_message }
  #   end
  # end

  # def create
  #   @post = Post.new(post_params)
  #   @post.user_id = current_user.id
  #   if @post.save
  #     render 'show.json.jbuilder'
  #   else
  #     render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
  #   end
  # end

  # def update
  #   if @post.update(post_params)
  #     render 'show.json.jbuilder'
  #   else
  #     render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
  #   end
  # end

  # def destroy
  #   if @post.destroy
  #     render json: { message: 'You deleted  that post.' }
  #   else
  #     render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
  #   end
  # end

  # private

  # # Drys up code
  # def set_post
  #   @post = Post.find_by(id: params[:id])
  # end

  # # only allows certain params through
  # def post_params
  #   params.require(:post).permit(:title, :content)
  # end

  # def require_current_user
  #   if !current_user
  #     render json: {}
  #   end
  # end
end
