class UserFishboard < ApplicationRecord
  belongs_to :user
  has_many :fish, as: :fishboard, dependent: :destroy
end
