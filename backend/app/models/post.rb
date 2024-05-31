class Post < ApplicationRecord
    belongs_to :group
    belongs_to :user
    has_many :comments, dependent: :destroy

    validates :title, presence: true, length: {maximum:100}
    validates :content, presence: true, length: {maximum:500}

    include ImageUploader[:images]
    attribute :images_posts_data, Array
  end