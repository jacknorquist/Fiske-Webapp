


module TokenService
    def generate_token(user_id)
      JWT.encode({ user_id: user_id }, Rails.application.secrets.secret_key_base)
    end

    def decode_token(token)
      puts "hello again"
      JWT.decode(token, Rails.application.secrets.secret_key_base).first
    rescue JWT::DecodeError
      nil
    end
  end
