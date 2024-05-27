class CreateMemberships < ActiveRecord::Migration[6.1]
  def change
    drop_table :memberships
    create_table :memberships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end

    add_index :memberships, [:user_id, :group_id], unique: true
  end
end
