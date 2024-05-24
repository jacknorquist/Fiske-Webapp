class CreateUser < ActiveRecord::Migration[6.0]
  def change
    drop_table :users
    create_table :users do |t|
      t.string :username, null: false, limit: 25
      t.string :first_name, null: false, limit: 25
      t.string :last_name, null: false, limit: 25
      t.text :bio, limit: 250
      t.string :email, null: false, limit: 255
      t.string :password_digest, null: false
      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end







