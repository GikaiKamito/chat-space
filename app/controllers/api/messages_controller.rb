class Api::MessagesController < ApplicationController
  def index
    @messages = Message.all
    respond_to do |format| 
      format.json { @new_message = @messages.where( 'id > ?', params[:id]) }
    end
  end
end