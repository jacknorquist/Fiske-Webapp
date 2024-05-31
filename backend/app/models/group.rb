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

    include ImageUploader[:header_image]
    include ImageUploader[:images]

    def unique_name
      return unless name_changed?

      if self.class.exists?(name: name)
        errors.add(:name, 'has already been taken')
      end
    end

  end
