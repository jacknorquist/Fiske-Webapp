class Group < ApplicationRecord
    belongs_to :admin, class_name: 'User'
    has_many :memberships
    has_many :members, through: :memberships, source: :user

    validates :admin, presence: true
    validates :name, presence: true, length: { maximum: 35 }, uniqueness: true
    validates :fish_species, length: { maximum: 50 }
    validates :area, length:{ maximum: 50 }
  end
