class AddUserFishboardToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :user_fishboard, foreign_key: { to_table: :user_fishboards }
  end
end
