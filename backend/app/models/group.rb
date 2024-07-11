class Group < ApplicationRecord
    belongs_to :admin, class_name: 'User'
    has_many :memberships, dependent: :destroy
    has_many :members, through: :memberships, source: :user
    has_many :posts, dependent: :destroy

    # has_many_attached :images
    # has_one_attached :header_image

    validates :admin, presence: true
    validates :name, presence: true, length: { maximum: 35 }, uniqueness: true
    validates :fish_species, length: { maximum: 50 }
    validates :area, length:{ maximum: 50 }
    validate :unique_name, on: :update

    validates :description, presence: true

    include ImageUploader[:header_image]
    IMAGES_COUNT = 5
    IMAGES_COUNT.times do |i|
      include ImageUploader["image_#{i+1}"]
    end

    def unique_name
      return unless name_changed?

      if self.class.exists?(name: name)
      end
    end

    def header_image_url
      return unless header_image_attacher.file.exists?
      header_image.url
    end

    def group_images_url(image)
      image.url
    end

  end
