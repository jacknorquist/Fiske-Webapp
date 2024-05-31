class Post < ApplicationRecord
    belongs_to :group
    belongs_to :user
    has_many :comments, dependent: :destroy

    has_many_attached :images

    validates :title, presence: true, length: {maximum:100}
    validates :content, presence: true, length: {maximum:500}

    include ImageUploader[:images]
    attribute :images_data, Array
  end