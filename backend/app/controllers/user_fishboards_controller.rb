class UserFishboardsController < ApplicationController
    before_action :set_user_fishboard, only: [:show, :update, :destroy]

    # GET /user_fishboards/:id
    def show
      render json: @user_fishboard
    end

    # POST /user_fishboards
    def create
      @user_fishboard = UserFishboard.new(user_fishboard_params)

      if @user_fishboard.save
        render json: @user_fishboard, status: :created
      else
        render json: @user_fishboard.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /user_fishboards/:id
    def update
      if @user_fishboard.update(user_fishboard_params)
        render json: @user_fishboard
      else
        render json: @user_fishboard.errors, status: :unprocessable_entity
      end
    end

    # DELETE /user_fishboards/:id
    def destroy
      @user_fishboard.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_user_fishboard
      @user_fishboard = UserFishboard.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_fishboard_params
      params.require(:user_fishboard).permit(:user_id, :name) # Add other permitted attributes as needed
    end
  end
