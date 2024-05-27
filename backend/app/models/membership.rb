class Membership < ApplicationRecord
    belongs_to :group
    belongs_to :user

    validates :user_id, uniqueness: { scope: :group_id, message: 'can only join a group once' }
  end