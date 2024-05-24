class User < ApplicationRecord
    has_secure_password
    # Validations
    validates :username, presence: true, length: { maximum: 25 }
    validates :first_name, presence: true, length: { maximum: 25 }
    validates :last_name, presence: true, length: { maximum: 25 }
    validates :bio, length: { maximum: 250}
    validates :email, presence: true, length: { maximum: 255 },
                      format: { with: URI::MailTo::EMAIL_REGEXP },
                      uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

    has_many :admin_groups, class_name: 'Group', foreign_key: 'admin_id'
    has_many :memberships
    has_many :groups, through: :memberships
    has_many :group_posts
    has_many :group_post_comments


    # Callbacks
    before_save :downcase_email

    private

    # Ensure email is saved in lowercase
    def downcase_email
      self.email = email.downcase
    end
  end
