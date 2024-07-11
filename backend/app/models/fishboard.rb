class Fishboard < ApplicationRecord
    belongs_to :user
    belongs_to :group
    has_many :fishes, dependent: :destroy
  end