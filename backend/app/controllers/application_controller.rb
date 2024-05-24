require_relative '../helpers/token_helper'

class ApplicationController < ActionController::API

    include TokenService

    before_action :authenticate_request

    private

    def authenticate_request
      token = request.headers['Authorization']&.split(' ')&.last

      if token.nil?
        render json: { error: 'Token not provided' }, status: :unauthorized and return
      end

      decoded_token = decode_token(token)

      unless decoded_token
        render json: { error: 'Not Authorized' }, status: :unauthorized
      else
        @current_user = User.find(decoded_token['user_id'])
      end
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
end
