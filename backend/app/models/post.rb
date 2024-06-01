class Post < ApplicationRecord
    belongs_to :group
    belongs_to :user
    has_many :comments, dependent: :destroy

    validates :title, presence: true, length: {maximum:100}
    validates :content, presence: true, length: {maximum:500}

    # IMAGES_COUNT = 5
    # IMAGES_COUNT.times do |i|
    #   include ImageUploader["post_image_#{i+1}"]
    # end
    include ImageUploader["post_image_1"]
    include ImageUploader["post_image_2"]
    include ImageUploader["post_image_3"]
    include ImageUploader["post_image_4"]
    include ImageUploader["post_image_5"]
  end