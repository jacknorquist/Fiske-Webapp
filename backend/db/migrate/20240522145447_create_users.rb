class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    drop_table :users
    create_table :users do |t|
      t.string :username, null: false, limit: 25
      t.string :first_name, null: false, limit: 25
      t.string :last_name, null: false, limit: 25
      t.text :bio, limit: 25 # Remove `null: false` constraint here
      t.string :email, null: false, limit: 255, index: { unique: true }
      t.string :password_digest, null: false

      t.timestamps
    end
  end
end