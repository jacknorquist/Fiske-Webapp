require "shrine"
require "shrine/storage/s3"

class User < ApplicationRecord
    has_secure_password
    # Validations
    validates :username, presence: true, length: { maximum: 25 }, uniqueness:true
    validates :first_name, presence: true, length: { maximum: 25 }
    validates :last_name, presence: true, length: { maximum: 25 }
    validates :bio, length: { maximum: 250}
    validates :email, presence: true, length: { maximum: 255 },
                      format: { with: URI::MailTo::EMAIL_REGEXP },
                      uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
    validate :unique_email, on: :update

    has_many :admin_groups, class_name: 'Group', foreign_key: 'admin_id'
    has_many :memberships
    has_many :groups, through: :memberships
    has_many :posts, dependent: :destroy # Add this line
    has_many :group_posts
    has_many :group_post_comments

    include ImageUploader[:header_image]
    include ImageUploader[:profile_image]

    # Callbacks
    before_save :downcase_email

    def unique_email
      return unless email_changed?

      if self.class.exists?(email: email)
      end
    end

    def header_image_url
      return unless header_image_attacher&.file&.exists?
      header_image.url
    end

    def profile_image_url
      return unless profile_image_attacher&.file&.exists?
      profile_image.url
    end

    def authenticate_password(password)
      authenticate(password) && password.present?
    end
    private


    # Ensure email is saved in lowercase
    def downcase_email
      self.email = email.downcase
    end
  end
