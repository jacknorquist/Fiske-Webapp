class GroupFishboardsController < ApplicationController
    before_action :set_group_fishboard, only: [:show, :update, :destroy]

    # GET /group_fishboards/:id
    def show
        render json: @group_fishboard.as_json(include: { fish: { methods: :image_url }})
    end

    # POST /group_fishboards
    def create
      @group_fishboard = GroupFishboard.new(group_fishboard_params)

      if @group_fishboard.save
        render json: @group_fishboard, status: :created
      else
        render json: @group_fishboard.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /group_fishboards/:id
    def update
      if @group_fishboard.update(group_fishboard_params)
        render json: @group_fishboard
      else
        render json: @group_fishboard.errors, status: :unprocessable_entity
      end
    end

    # DELETE /group_fishboards/:id
    def destroy
      @group_fishboard.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_group_fishboard
      @group_fishboard = GroupFishboard.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def group_fishboard_params
      params.require(:group_fishboard).permit(:group_id, :name) # Add other permitted attributes as needed
    end
  end