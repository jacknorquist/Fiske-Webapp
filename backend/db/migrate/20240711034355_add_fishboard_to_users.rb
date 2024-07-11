class AddFishboardToUsers < ActiveRecord::Migration[6.1]
  def up
    # Find or create a default fishboard
    default_fishboard = Fishboard.create!(user_id: 52, group_id: 7)  # Provide a user_id for the default fishboard
    add_reference :users, :fishboard, foreign_key: true, default: default_fishboard.id
  end

  def down
    remove_reference :users, :fishboard
  end
end