class Api::V1::MessagesController < ApplicationController
  before_action :set_message, only: [:show, :destroy]
  before_action :require_current_user, only: [:index, :show, :destroy]

  def index
    @messages = Message.all.order(created_at: :desc)
    puts @messages
    if @messages.length > 0
      render 'index.json.jbuilder'
    else
      error_name = 'There have been no messages yet'
      error_email = 'Expect some soon!'
      error_message = 'You have friends I swear...'
      render json: { messages: [{ name: error_name, email: error_email, message: error_message }] }
    end
  end

  def show
    if @message
      render 'show.json.jbuilder'
    else
      error_name = "This message doesn't exist"
      error_email = 'Expect one soon!'
      error_message = 'You have friends I swear...'
      render json: { name: error_name, email: error_email, message: error_message }
    end
  end

  def create
    message_params = {
      name: params[:name],
      email: params[:email],
      message: params[:message]
    }
    @message = Message.new(message_params)
    if @message.save
      render 'show.json.jbuilder'
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
    end
  end

  def destroy
    if @message.destroy
      render json: { message: 'Message Deleted' }
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  # Drys up code
  def set_message
    @message = Message.find_by(id: params[:id])
  end

  def require_current_user
    if !current_user
      render json: {}
    end
  end
end
