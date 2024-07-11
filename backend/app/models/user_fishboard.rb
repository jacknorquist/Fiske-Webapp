class Fishboard < ApplicationRecord
    belongs_to :user
    belongs_to :group
    has_many :fish, dependent: :destroy
  end