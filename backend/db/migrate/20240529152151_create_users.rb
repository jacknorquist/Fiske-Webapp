class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    drop_table :memberships
    drop_table :comments
    drop_table :posts
    drop_table :groups
    drop_table :users
    create_table :users do |t|
      t.string :username, null: false, limit: 25
      t.string :first_name, null: false, limit: 25
      t.string :last_name, null: false, limit: 25
      t.string :bio, limit: 250
      t.string :email, null: false, limit: 255
      t.string :password_digest
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end